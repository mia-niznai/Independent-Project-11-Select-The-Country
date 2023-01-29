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
  
  it("CONGRATULATIONS", async () => {
        await expect(1).toBe(1);
  });
  
});