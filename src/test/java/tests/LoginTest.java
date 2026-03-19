package tests;

import pages.LoginPage;
import pages.DashboardPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTest {

    private WebDriver driver;

    @BeforeEach
    void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }

    @Test
    void testLogin() {
        LoginPage loginPage = new LoginPage(driver);

        loginPage.open("http://azeuwathdevtestathonvm.azeuwdevath.lan:8016/auth/login");
        driver.manage().window().maximize();

        loginPage.login("sifistestakis", "sifis2026");

        // Verify the head title of the dashboard is displayed
        DashboardPage dashboardPage = new DashboardPage(driver);
        dashboardPage.verifyCorrectHeader();
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
