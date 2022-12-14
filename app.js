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
        await delay(5000);

        // Selecionar contato para envio de mensagem
        const contactName = "Nome do Contato";
        await page.click(`span[title='${contactName}']`);
        await page.waitForSelector(".uwk68");

        // Encontra a barra de mensagem e foca nela
        const editor = await page.$("div[tabindex='-1']");
        await editor.focus();

        // Quantidade de mensagens que será enviada
        const amoutOfMessages = 10;

        // Selecionar entre mensagem unica ou com alternância
        const mode = "normal";
        switch (mode) {
            case "normal":

                // Loop de envio de mensagens
                for (var i = 0; i < amoutOfMessages; i++) {
                    await page.evaluate (() => {
                        const message = "Mensagem";
                        document.execCommand("insertText", false, message);
                    });
                    await page.click("span[data-testid='send']");
                    await delay(500);
                };
                break;

            case "alt":

                // Loop de envio de mensagens com variação de mensagem
                let count = 0;
                const qntMessages = amoutOfMessages*2;
                for (var i = 0; i < qntMessages; i++) {
                    if(count % 2 == 0){
                        await page.evaluate(() => {
                        const message = "Mensagem 1";
                        document.execCommand("insertText", false, message);
                        });
                        await page.click("span[data-testid='send']");
                        await delay(500);
                        count ++;
                    } else if (count % 2 !== 0){
                        await page.evaluate(() => {
                        const message = "Mensagem 2";
                        document.execCommand("insertText", false, message);
                        });
                        await page.click("span[data-testid='send']");
                        await delay(500);
                        count ++;
                    }
        }
        
    }

    } catch (e) {
        console.error("error mine", e);
    }

})();      

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}