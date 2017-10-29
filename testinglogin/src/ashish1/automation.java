package ashish1;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class automation {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//System.setProperty("webdriver.chrome.driver", "/Users/ashishmekala/Downloads/chromedriver");
		WebDriver driver= new ChromeDriver();
		driver.get("file:/Users/ashishmekala/se_project/helloworld/platforms/ios/www/index.html");
		driver.manage().window().maximize();
		driver.findElement(By.id("in_user_name") ).sendKeys("Am15am");
		driver.findElement(By.id("in_user_pwd")).sendKeys("am15am");
		driver.findElement(By.xpath("//*[@name='remember']")).click();
		driver.findElement(By.xpath("//*[@id='insign']")).click();
		driver.findElement(By.id("signup")).click();
		driver.findElement(By.xpath("//*[@id='up_user_name']") ).sendKeys("Am15am");
		driver.findElement(By.xpath("//*[@id='up_user_pwd']") ).sendKeys("am15am");
		driver.findElement(By.xpath("//*[@id='up_user_email']") ).sendKeys("am15am@my.fsu.edu");
		driver.findElement(By.className("ui-btn-inner")).click();
	}
}