window.onload = function() {
    rates.init();
}

class ExchangeRates {
    base = "PLN";
    date = "";
    ratesData = null;
    url = "https://api.exchangeratesapi.io/latest?base=" + this.base;

    init() {
        this.loadData();
    }

    loadData() {
        fetch(this.url).then((response) => {
            response.json().then((data) => {
                this.parseData(data);
            });
        });
    }

    parseData(data) {
        console.log(data);
        this.base = data.base;
        this.date = data.date;
        this.ratesData = data;

        document.querySelector("h3").innerHTML = "Kursy walut względem " + this.base + " z dnia " + this.date;

        let i = 1;
        for(const [key, value] of Object.entries(data.rates)) {
            this.addRateToTable(i, key, value);
            i++;
        }
    }

    addRateToTable(id, currency, exchangeRate) {
        
        if(currency == this.base) return;

        console.log(`id: ${id}, currency: ${currency}`)
        let tbody = document.querySelector("#ratesTable tbody");
        let tr = document.createElement("tr");

        exchangeRate = 1 / exchangeRate;
        
        tr.innerHTML = `
            <td class="align-middle">${id}</td>
            <td class="align-middle">${currency}</td>
            <td class="align-middle">${exchangeRate.toFixed(4)}</td>
        `;

        tbody.appendChild(tr);
    }
}

const rates = new ExchangeRates();