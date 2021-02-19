let navigationService = {
    peopleBtn: document.getElementById("peopleBtn"),
    shipsBtn: document.getElementById("shipsBtn"),
    planetsBtn: document.getElementById("planetBtn"),
    nextBtn: document.getElementById("nextBtn"),
    previousBtn: document.getElementById("prevBtn"),
    currentPage: 1,
    pageType: "",
    requestCount: 0,
    todaysDate: new Date().getDate(),
    registerListeners: function(){
        this.peopleBtn.addEventListener('click', function(){
            if(navigationService.pageType === "people") return;
            uiService.toggleLoader(true);
            starWarsApiService.getPeople(1);
            navigationService.currentPage = 1;
            navigationService.pageType = "people";
            navigationService.limitRequests();
        }),
        this.shipsBtn.addEventListener('click', function(){
            if(navigationService.pageType === "ships") return;
            uiService.toggleLoader(true);
            starWarsApiService.getShips(1);
            navigationService.currentPage = 1;
            navigationService.pageType = "ships";
            navigationService.limitRequests();
        }),
        this.planetsBtn.addEventListener('click', function(){
            if(navigationService.pageType === "planets") return;
            uiService.toggleLoader(true);
            starWarsApiService.getPlanets(1);
            navigationService.currentPage = 1;
            navigationService.pageType = "planets";
            navigationService.limitRequests();
        }),
        this.nextBtn.addEventListener('click', this.nextPage),
        this.previousBtn.addEventListener('click', this.previousPage)
    },
    nextPage: function(){
        navigationService.currentPage++;
        uiService.toggleLoader(true);
        if(navigationService.pageType === "people") starWarsApiService.getPeople(navigationService.currentPage);
        if(navigationService.pageType === "ships") starWarsApiService.getShips(navigationService.currentPage);
        if(navigationService.pageType === "planets") starWarsApiService.getPlanets(navigationService.currentPage);
    },
    previousPage: function(){
        navigationService.currentPage--;
        uiService.toggleLoader(true);
        if(navigationService.pageType === "people") starWarsApiService.getPeople(navigationService.currentPage);
        if(navigationService.pageType === "ships") starWarsApiService.getShips(navigationService.currentPage);
        if(navigationService.pageType === "planets") starWarsApiService.getPlanets(navigationService.currentPage);
    },
    navButtonsCheck: function(response){
        if(response.next === null){
            this.nextBtn.style.display = "none";
        }else{
            this.nextBtn.style.display = "block";
        }
        if(response.previous === null){
            this.previousBtn.style.display = "none";
        }else{
            this.previousBtn.style.display = "block";
        }
        if(response.next === null){
            this.nextBtn.style.display = "none";
        }else{
            this.nextBtn.style.display = "block";
        }
    },
    limitRequests: function(){
        if(navigationService.todaysDate === new Date().getDate()){
            if(navigationService.requestCount>9){
                navigationService.nextBtn.style.display = "none";
                navigationService.previousBtn.style.display = "none";
                uiService.limitReachedScreen();
            }
        }else if(navigationService.todaysDate !== new Date().getDate()){
            navigationService.requestCount = 0;
        }
        navigationService.requestCount++;
    }
};

let starWarsApiService = {
    url: "https://swapi.dev/api/",
    getPeople: function(page){
        if(navigationService.requestCount>9) return;
        else{
            let peopleUrl = `${this.url}people/?page=${page}`;
            $.ajax({
                url: peopleUrl,
                success: function(response){
                    navigationService.navButtonsCheck(response);
                    uiService.loadPeoplePage(response.results);
                    document.getElementById("peopleSort").addEventListener('click', function(){
                        uiService.sortDataByName(response.results);
                    });
                },
                error: function(response){
                    uiService.errorMessage(response);
                },
                complete: function(){
                    uiService.toggleLoader(false);
                }
            })
        }
    },
    getShips: function(page){
        if(navigationService.requestCount>9) return;
        else{
            let shipsUrl = `${this.url}starships/?page=${page}`;
            $.ajax({
                url: shipsUrl,
                success: function(response){
                    navigationService.navButtonsCheck(response);
                    uiService.loadShipsPage(response.results);
                    document.getElementById("shipsSort").addEventListener('click', function(){
                        uiService.sortDataByName(response.results);
                    });
                },
                error: function(response){
                    uiService.errorMessage(response);
                },
                complete: function(){
                    uiService.toggleLoader(false);
                }
            })
        }
    },
    getPlanets: function(page){
        if(navigationService.requestCount>9) return;
        else{
            let planetsUrl = `${this.url}planets/?page=${page}`;
            $.ajax({
                url: planetsUrl,
                success: function(response){
                    navigationService.navButtonsCheck(response);
                    uiService.loadPlanetsPage(response.results);
                    document.getElementById("planetsSort").addEventListener('click', function(){
                        uiService.sortDataByName(response.results);
                    });
                },
                error: function(response){
                    uiService.errorMessage(response);
                },
                complete: function(){
                    uiService.toggleLoader(false);
                }
            })
        }
    }
};

let uiService = {
    resultElement: document.getElementById("result"),
    loader: document.getElementById("loader"),
    loadPeoplePage: function(data){
        this.resultElement.innerHTML = "";
        this.resultElement.innerHTML +=`
        <div class="row yellow padding">
            <div class="col-md-3" id="peopleSort">Name</div>
            <div class="col-md-2">Height</div>
            <div class="col-md-2">Mass</div>
            <div class="col-md-2">Gender</div>
            <div class="col-md-2">Birth Year</div>
            <div class="col-md-1">Films</div>
        </div>
        `;
        for(let person of data){
            this.resultElement.innerHTML +=`
            <div class="row white padding">
                <div class="col-md-3">${person.name}</div>
                <div class="col-md-2">${person.height}</div>
                <div class="col-md-2">${person.mass}</div>
                <div class="col-md-2">${person.gender}</div>
                <div class="col-md-2">${person.birth_year}</div>
                <div class="col-md-1">${person.films.length}</div>
            </div>
            `;
        }
    },
    loadShipsPage: function(data){
        this.resultElement.innerHTML = "";
        this.resultElement.innerHTML +=`
        <div class="yellow row padding">
            <div class="col-md-3" id="shipsSort">Name</div>
            <div class="col-md-2">Model</div>
            <div class="col-md-2">Manufacturer</div>
            <div class="col-md-2">Cost</div>
            <div class="col-md-2">Capacity</div>
            <div class="col-md-1">Crew</div>
        </div>
        `;
        for(let ship of data){
            this.resultElement.innerHTML +=`
            <div class="white row padding">
                <div class="col-md-3">${ship.name}</div>
                <div class="col-md-2">${ship.model}</div>
                <div class="col-md-2">${ship.manufacturer}</div>
                <div class="col-md-2">${ship.cost_in_credits}</div>
                <div class="col-md-2">${ship.passengers}</div>
                <div class="col-md-1">${ship.crew}</div>
            </div>
            `;
        }
    },
    loadPlanetsPage: function(data){
        this.resultElement.innerHTML = "";
        this.resultElement.innerHTML +=`
        <div class="yellow row padding">
            <div class="col-md-3" id="planetsSort">Name</div>
            <div class="col-md-2">Gravity</div>
            <div class="col-md-2">Population</div>
            <div class="col-md-2">Diameter</div>
            <div class="col-md-2">Climate</div>
            <div class="col-md-1">Rotation Period</div>
        </div>
        `;
        for(let planet of data){
            this.resultElement.innerHTML +=`
            <div class="white row padding">
                <div class="col-md-3">${planet.name}</div>
                <div class="col-md-2">${planet.gravity}</div>
                <div class="col-md-2">${planet.population}</div>
                <div class="col-md-2">${planet.diameter}</div>
                <div class="col-md-2">${planet.climate}</div>
                <div class="col-md-1">${planet.rotation_period}</div>
            </div>
            `;
        }
    },
    toggleLoader: function(toggle){
        if (toggle) this.loader.style.display = "block";
        else this.loader.style.display = "none";
    },
    sortDataByName: function(data){
        function compare(a, b){
            if (a.name < b.name){
              return -1;
            }
            if (a.name > b.name){
              return 1;
            }
            return 0;
          }
          data.sort(compare);
          if(navigationService.pageType === "people") uiService.loadPeoplePage(data);
          else if(navigationService.pageType === "ships") uiService.loadShipsPage(data);
          else if(navigationService.pageType === "planets") uiService.loadPlanetsPage(data);
    },
    errorMessage: function(data){
        this.resultElement.innerHTML = "";
        this.resultElement.innerHTML +=`
        <div id="errorMessage" class="center">
            <img src="./SRC/Images/darthVader.png" alt="darthVader" id="darthVader">
            <div id="message">
                <h1>Oh snap!</h1>
                <p>Something wierd happend.<br>
                Keep calm and try again.</p>
                <p>Status: ${data.statusText}</p>
            </div>
        </div>
        `;
    },
    limitReachedScreen: function(){
        uiService.toggleLoader(false);
        uiService.resultElement.innerHTML = "";
        document.getElementsByTagName("body")[0].innerHTML +=`
        <div id="limitReached">
        <img src="./SRC/Images/lock.png" alt="lock" style="height:200px; margin-top:20px;" class="center" />
        <h2>You have reached the daily limit!!!</h2>
        <p>**Come and try again tomorrow**</p>
        </div>`;
    }
};

navigationService.registerListeners();