package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DashboardPage {

    private final WebDriver driver;

    // Locators
    private final By dashboardHeader = By.xpath("//h2");

    public DashboardPage(WebDriver driver) {
        this.driver = driver;
    }

    public WebElement getActualHeaderElement() {
        WebElement header = driver.findElement(dashboardHeader);
        header.isDisplayed();
        return header;
    }

    public void verifyCorrectHeader(String expectedHeader) {
        WebElement actualHeader = getActualHeaderElement();
        assertEquals(expectedHeader, actualHeader.getText().trim());
    }

    public void logout(String username) {
        driver.findElement(By.xpath("//a[normalize-space(.)='" + username + "']")).click();
        driver.findElement(By.xpath("//a[normalize-space(.)='Logout']")).click();
    }
}
