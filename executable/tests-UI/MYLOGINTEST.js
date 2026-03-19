function myLOGINTEST() {skynet.loadScreenshotSupport();
skynet.get("#username").click();
skynet.get("#username").type("userJK123");
skynet.get("#password").click();   
skynet.get("#password").type("userJK1234");
skynet.get("#username").shouldHaveValue('userJK123')  
skynet.get("#password").shouldHaveValue('userJK1234')
skynet.get('button[type="submit"]').click(); 
skynet.report();}
