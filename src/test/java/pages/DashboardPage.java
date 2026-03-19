package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class DashboardPage {

    private final WebDriver driver;

    // Locators
    private By header = By.xpath("//h2");

    public DashboardPage(WebDriver driver) {
        this.driver = driver;
    }

    public void verifyCorrectHeader() {
        driver.findElement(header).isDisplayed();
    }
}
