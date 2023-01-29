require("util").inspect.defaultOptions.depth = null;
jest.setTimeout(1200);
const baseURL = process.env.TEST_BASE_URL;

// Show the version of the browser used by Puppeteer if desired
//page.browser().version().then(version => console.log(version));

// Show logs from the page
const onPageConsole = msg => {
  Promise.all(msg.args().map(e => e.jsonValue()))
    .then(args =>
      console.log(`<LOG::page console ${msg.type()}>`, ...args)
    )
  ;
};
beforeAll(() => {
  page.setDefaultTimeout(1000);
});
beforeEach(() => {
  if (!page.listeners("console").includes(onPageConsole)) {
    page.on("console", onPageConsole);
  }
  
  // Reset mock function's states before each test.
  jest.clearAllMocks();
});

describe("Index Page", () => {
  beforeEach(async () => {
    await page.goto(baseURL, {waitUntil: "load"});
  });
  
  const setCriteria = async (criteria, filterContent) => {
    await page.click('select');
    await page.keyboard.press(criteria[0]);
    await page.keyboard.press('Enter');
    await page.click('input', { clickCount: 3 });
    if (filterContent.length === 0) {
      await page.keyboard.press('Backspace');
    } else {
      await page.keyboard.type(filterContent);
    }
    
  }
  
  const getFilteredContent = async () => {
    const result = await page.$eval('textarea', el => {
      const length = el.value.length;
      if (el.value[length-1] === '\n') {
        return el.value.slice(0, -1);
      } else {
        return el.value;
      }
    });
    return result;
  }
  
  it("Selecting the sort criteria `Capital` and typing in the input box `` (empty string) the filtered countries are displayed correctly", async () => {
    await setCriteria('capital', "");
    const result = await getFilteredContent();
    
    await expect(result).toBe("Albania\nBelgium\nBulgaria\nComoros\nDenmark\nItaly\nLiberia\nMadagascar\nNigeria\nSingapore\nTajikistan\nZimbabwe");
  });
  
  it("Selecting the sort criteria `Name` and typing in the input box `be` the filtered countries are displayed correctly", async () => {
    await setCriteria('name', "be");
    const result = await getFilteredContent();
    
    await expect(result).toBe("Belgium\nLiberia");
  });
  
  it("Selecting the sort criteria `Capital` and typing in the input box `re` the filtered countries are displayed correctly", async () => {
    await setCriteria('capital', "re");
    const result = await getFilteredContent();
    
    await expect(result).toBe("Singapore\nZimbabwe");
  });
  
  it("Selecting the sort criteria `Capital` and typing in the input box `re` followed by clearing the typed content (empty string) the filtered countries are displayed correctly", async () => {
    await setCriteria('capital', "re");
    await setCriteria('capital', "");
    const result = await getFilteredContent();
    
    await expect(result).toBe("Albania\nBelgium\nBulgaria\nComoros\nDenmark\nItaly\nLiberia\nMadagascar\nNigeria\nSingapore\nTajikistan\nZimbabwe");
  });
});