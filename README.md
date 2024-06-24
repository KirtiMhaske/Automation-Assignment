### QA Challenge

#### Application Under Test

We are using https://www.saucedemo.com/ as the Application Under Test. This App is a **React.js** Frontend

- URL: https://www.saucedemo.com/ 
- OS : macOS 
- IDE : Visual Studio Code

 
	A document containing your test cases for the main flows you have defined, in addition to test plan and strategy. 

-	Test Cases document => Test Cases for Automation Practice Ecommerce website.xlsx
-	Test Plan and Strategy Document => Test Plan and Strategy.docx

	Your test scripts and code for the test automation. 

-	Automation scripts under playwright framework=> Directory named ‘Playwright Automation’

	A document containing your bug reports for the website. 

-	Bug report => Bug Report.xlsx

	A readme file explaining how to run and configure your test scripts and code. 

-	Readme file with all the required info => README.md file under Directory named ‘Playwright Automation’


	If you want to run the tests on multiple websites with different URLs supporting different countries, can you apply it on them? How would you think of a way to structure your tests? 

For reusability of this framework, I have tried to make all the dynamic data, selectors, error messages configurable.
I have used page model, config files and data files for configuring these properties.
We would need very minimal changes in case we have to use the same framework for automating tests for new ECommerce websites.
