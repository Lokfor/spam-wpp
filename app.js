const puppeteer = require ('puppeteer');

// Função de Login
(async function main() {
    try{
        // Configurando puppeteer
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        );

        // Entrando no site do whatsapp web
        await page.goto("https://web.whatsapp.com/");

        // Buscar listagem de contatos
        await page.waitForSelector("._1KDb8");
        await DelayNode(5000);
    }
})