function MYREGISTERTEST() { skynet.get("#full_name").click();
                  skynet.get("#full_name").type("MYnAME213");
                  skynet.get("#email").click();
                  skynet.get("#email").type("TEST@TEST.MYTEST");
                  skynet.get("#username").click();
                  skynet.get("#username").type("TESTINGTON");
                  skynet.get("#password").click();
                  skynet.get("#password").type("TESTINGTON");
                  skynet.get("#confirm_password").click();
                  skynet.get("#confirm_password").type("TESTINGTON");
                  skynet.get("#full_name").shouldHaveValue('MYnAME213')
                  skynet.get("#email").shouldHaveValue("TEST@TEST.MYTEST");
                  skynet.get("#username").shouldHaveValue("TESTINGTON");
                  skynet.get("#password").shouldHaveValue("TESTINGTON");
                  skynet.get("#confirm_password").shouldHaveValue("TESTINGTON");



                           
                  skynet.get('button[type="submit"]').click();
                  skynet.report();
                 }