package tests;

import pages.LoginPage;
import pages.DashboardPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTest {

    private WebDriver driver;
    private final String username = "sifistestakis";
    private final String password = "sifis2026";
    private final String expectedDashboardHeader = "Welcome, Sifis Testakis!";
    private final String expectedLoginHeader = "QuickWallet Login";

    @BeforeEach
    void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }

    @Test
    void testLoginLogout() {
        LoginPage loginPage = new LoginPage(driver);

        loginPage.open("http://azeuwathdevtestathonvm.azeuwdevath.lan:8016/auth/login");
        driver.manage().window().maximize();

        loginPage.login(username, password);

        // Verify the head title of the dashboard is displayed
        DashboardPage dashboardPage = new DashboardPage(driver);
        dashboardPage.verifyCorrectHeader(expectedDashboardHeader);

        // Logout and verify the login page is displayed
        dashboardPage.logout(username);
        loginPage.verifyCorrectHeader(expectedLoginHeader);
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
