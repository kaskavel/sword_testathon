 function CREATEACCOUNT() {skynet.get("#currency").click();
                           skynet.get("#currency").type("USD");
                           skynet.get("#currency").click();
                           skynet.get("#account_name").click();
                           skynet.get("#account_name").type("MyNewAccountMynewAccount");
                           skynet.get("#initial_deposit").click();
                           skynet.get("#initial_deposit").type("10000010");



                           skynet.get("#currency").shouldHaveValue("USD");
                           skynet.get("#account_name").shouldHaveValue("MyNewAccountMynewAccount");
                           skynet.get("#initial_deposit").shouldHaveValue("10000010");
                           
                           
                           skynet.get('button[type="submit"]').click();    skynet.report();  }