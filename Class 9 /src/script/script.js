let navService = {
    navItems: document.getElementsByClassName("nav-item"),
    navSearch: document.getElementById("citySearchInput"),
    searchBtn: document.getElementById("citySearchBtn"),
    pages: document.getElementById("pages").children,
    previousBtn: document.getElementById("previousBtn"),
    nextBtn: document.getElementById("nextBtn"),
    sortWindSpeed: document.getElementById("sortWindSpeed"),
    month: new Date().getMonth(),
    minutes: new Date().getMinutes(),
    counterMinute: 0,
    counterMonth: 0,
    activateItem: function(item){
        for(let navItem of this.navItems){
            navItem.classList.remove("active");
        }
        item.classList.add("active");
    },
    showPage: function(page){
        for(let pageElement of this.pages){
            pageElement.style.display = "none";
        }
        page.style.display = "block";
    },
    checkAPIRestrictions: function(){
        if(this.minutes !== new Date().getMinutes()) navService.counterMinute=0;
        if(this.month !== new Date().getMonth()) navService.counterMonth=0;
        console.log(this.counterMinute);
        if(this.minutes === new Date().getMinutes() && navService.counterMinute>59) return false;
        else if(this.month === new Date().getMonth() && navService.counterMonth>999999) return false;
        else return true;
    },
    registerNavListeners: function(){
        uiService.toggleLoader(true);
        for(let i=0; i<this.navItems.length; i++){
            this.navItems[i].addEventListener("click", function(){
                navService.activateItem(this);
                navService.showPage(navService.pages[i]);
            })
        }
        this.searchBtn.addEventListener("click", function(event){
            event.preventDefault();
            uiService.toggleLoader(true);
            weatherService.city = navService.navSearch.value;
            weatherService.getDataAsync();
        })
    },
    pagingHourly: function(data){
        let currentPossition = 0;
        let itemsShown = 10;
        let numberOfListings = data.list.length;
        if(currentPossition<= 0) navService.previousBtn.style.display = "none";
        uiService.loadHourlyTable(data, currentPossition, itemsShown);

        this.nextBtn.addEventListener('click', function(){
            navService.previousBtn.style.display = "block";
            currentPossition+=10;
            itemsShown+=10;
            uiService.loadHourlyTable(data, currentPossition, itemsShown);
            if(numberOfListings<=itemsShown) navService.nextBtn.style.display = "none";
        })

        this.previousBtn.addEventListener('click', function(){
            navService.nextBtn.style.display = "block";
            currentPossition-=10;
            itemsShown-=10;
            uiService.loadHourlyTable(data, currentPossition, itemsShown);
            if(currentPossition<= 0) navService.previousBtn.style.display = "none";
        })

        this.sortWindSpeed.addEventListener('click', function(){
            let results = [];
            for(let i=currentPossition; i<itemsShown; i++){
                results.push(data.list[i]);
            }
            results.sort((a,b)=> a.wind.speed - b.wind.speed);
            uiService.loadHourlyTableSorted(results);
        })
    }
};

let weatherService = {
    apiKey: "9fadf053bb71e8c4a36d5943163d1642",
    city: "skopje",
    apiUrl: "https://api.openweathermap.org/data/2.5/",
    getDataAsync: async function(){
        if(navService.checkAPIRestrictions()){
            try{
            let data = await fetch(`${this.apiUrl}forecast?q=${this.city}&units=metric&appid=${this.apiKey}`);
            let response = await data.json();
            uiService.loadStatistics(await response);
            navService.pagingHourly(await response);
            uiService.statisticsCity.innerHTML = await response.city.name;
            uiService.hdCity.innerHTML = await response.city.name;
            navService.counterMinute++;
            navService.counterMonth++;
            uiService.toggleLoader(false);
            this.getCircleDataAsync(await response.city.coord.lat, await response.city.coord.lon);
            }
            catch{
                uiService.errorMessage('error');
                uiService.toggleLoader(false);
            }
        }else{
            uiService.errorMessage('restriction');
            uiService.toggleLoader(false);
        }
    },
    getCircleDataAsync: async function(lat, lon, cnt="5"){
        let response = await fetch(`${weatherService.apiUrl}find?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${weatherService.apiKey}`);
        let data = await response.json();
        uiService.citiesInCircle(await data);
        uiService.itemsToShow.addEventListener('change', ()=>{
            cnt = uiService.itemsToShow.value;
            this.getCircleDataAsync(lat, lon, cnt);
        })
    },
    agregateStatistics: function(data){
        let list = data.list;
        let highestTemperature = list[0];
        let lowestTemperature = list[0];
        let highestHumidity = list[0];
        let lowestHumidity = list[0];

        let temperatureSum = list.reduce((sum, reading)=> sum + reading.main.temp,0);
        let humiditySum = list.reduce((sum, reading)=> sum + reading.main.humidity,0);
        list.forEach(reading => {
            if(highestTemperature.main.temp < reading.main.temp){
                highestTemperature = reading;
            }
            if(lowestTemperature.main.temp > reading.main.temp){
                lowestTemperature = reading;
            }

            if(highestHumidity.main.humidity < reading.main.humidity){
                highestHumidity = reading;
            }
            if(lowestHumidity.main.humidity > reading.main.humidity){
                lowestHumidity = reading;
            }
        });

        return {
            temperature:{
                highest: highestTemperature.main.temp,
                average: temperatureSum / list.length,
                lowest: lowestTemperature.main.temp
            },
            humidity:{
                highest: highestHumidity.main.humidity,
                average: humiditySum / list.length,
                lowest: lowestHumidity.main.humidity
            },
            warmestTime: helperService.unixTimeStampToDate(highestTemperature.dt),
            coldestTime: helperService.unixTimeStampToDate(lowestTemperature.dt)
        }
    }
};

let uiService = {
    statisticResult: document.getElementById("statisticsResult"),
    tableResult: document.getElementById("tableResult"),
    hdCity: document.getElementById("hdCity"),
    statisticsCity: document.getElementById("statisticsCity"),
    cityInCenter: document.getElementById("cityInCenter"),
    citiesCircleResult: document.getElementById("citiesCircle"),
    itemsToShow: document.getElementById("itemsToShow"),
    loader: document.getElementById("loader"),
    loadStatistics: function(data){
        let statisticsData = weatherService.agregateStatistics(data);
        this.statisticResult.innerHTML= `
        <div class="mb-5">
            <div class="row">
                <div class="col-md-6">MAX TEMP: ${Math.round(statisticsData.temperature.highest)}C</div>
                <div class="col-md-6">MAX HUMD: ${Math.round(statisticsData.humidity.highest)}%</div>
            </div>
            <div class="row">
                <div class="col-md-6">AVG TEMP: ${statisticsData.temperature.average.toFixed(1)}C</div>
                <div class="col-md-6">AVG HUMD: ${statisticsData.humidity.lowest.toFixed(2)}%</div>
            </div>
            <div class="row">
            <div class="col-md-6">LOW TEMP: ${statisticsData.temperature.lowest}C</div>
            <div class="col-md-6">LOW HUMD: ${statisticsData.humidity.lowest}%</div>
            </div>
        </div>
        <h4>Warmest time of the following period: ${statisticsData.warmestTime.toDateString()}</h4>
        <h4>Coldest time of the following period: ${statisticsData.coldestTime.toDateString()}</h4>
        `;
    },
    loadHourlyTable: function(data, currentPossition, itemsShown){
        uiService.tableResult.innerHTML = "";
        for(let i=currentPossition; i<itemsShown; i++){
            uiService.tableResult.innerHTML +=`
                <div class="row">
                    <div class="col-md-2">
                        <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" alt="weather-icon" >
                    </div>
                    <div class="col-md-2">${data.list[i].weather[0].description}</div>
                    <div class="col-md-2">${helperService.unixTimeStampToDate(data.list[i].dt).toDateString()}</div>
                    <div class="col-md-2">${data.list[i].main.temp}C (${data.list[i].main.feels_like}C)</div>
                    <div class="col-md-2">${data.list[i].main.humidity}</div>
                    <div class="col-md-2">${data.list[i].wind.speed}</div>
                </div>
            `
        }
    },
    loadHourlyTableSorted: function(data){
        this.tableResult.innerHTML = "";
        data.forEach(reading => {
            this.tableResult.innerHTML +=`
                <div class="row">
                    <div class="col-md-2">
                        <img src="http://openweathermap.org/img/w/${reading.weather[0].icon}.png" alt="weather-icon" >
                    </div>
                    <div class="col-md-2">${reading.weather[0].description}</div>
                    <div class="col-md-2">${helperService.unixTimeStampToDate(reading.dt).toDateString()}</div>
                    <div class="col-md-2">${reading.main.temp}C (${reading.main.feels_like}C)</div>
                    <div class="col-md-2">${reading.main.humidity}</div>
                    <div class="col-md-2">${reading.wind.speed}</div>
                </div>
            `
        });
    },
    citiesInCircle: function(data){
        this.cityInCenter.innerHTML = data.list[0].name;
        this.citiesCircleResult.innerHTML = "";
        data.list.forEach((city, index)=> {
            this.citiesCircleResult.innerHTML+=`
            <div class="row">
            <div class="col-md-2">${index+1}</div>
            <div class="col-md-2">${city.name}</div>
            <div class="col-md-2">${city.main.temp}</div>
            <div class="col-md-2">${city.main.feels_like}</div>
            <div class="col-md-2">${city.main.humidity}</div>
            <div class="col-md-2">${city.main.pressure}</div>
            </div>
            `
        });
    },
    toggleLoader: function(flag){
        if(flag) this.loader.style.display = "block";
        else this.loader.style.display = "none";
    },
    errorMessage: function(type){
        if(type === 'restriction'){
            $("#pages").after(`
            <div class="error" style="background-color: white;">
                <img src="./src/image/lock.png" alt="error" height="150px">
                <h1>We apologize for your inconvenience! Please come back and try again.</h1>
                <h3>There is a reachability limit by minute and month, and seems like you've reached it!</h3>
                <p>**The limit per minute is 60 searches!**</p>
                </p>**The limit per month is 1M searches!**</p>
            </div>
            `);
        }else{
            $("#pages").after(`
            <div class="error">
                <img src="./src/image/error.png" alt="error" height="150px">
                <h1>Something went wrong!</h1>
                <h3>Refresh the page and try again!</h3>
            </div>`);
        }
    }
};

let helperService = {
    unixTimeStampToDate: function(unixTimeStamp){
        return new Date(unixTimeStamp * 1000);
    }
};

    navService.registerNavListeners();
    weatherService.getDataAsync();