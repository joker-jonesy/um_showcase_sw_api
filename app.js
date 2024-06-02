const base_query = "https://swapi.py4e.com/api/"

const fetchSinglePlanet = async (id)=> {
    const request = await fetch(base_query+`planets/${id}/`);
    return await request.json()
}

const fetchPlanets = async (pg)=> {
    if(!pg){
        pg=1
    }
    const request = await fetch(base_query+`planets/?page=${pg}`);
    return await request.json()
}

const printRequest = (req, type)=>{
    document.getElementById("wrapper").innerHTML=""
    req.then(response=>{
        if(type==="character"){
            response.results?
                response.results.forEach(i=>createBlock(i,"character"))
                :
                createBlock(response, "character");
        }

        if(type==="planet"){
            response.results?
                response.results.forEach(i=>createBlock(i,"planet"))
                :
                createBlock(response, "planet")
        }

    }, er=>{
        console.log(er)
    })
}

const createBlock = (obj, type)=>{
    const block = document.createElement("div");
    const nameEle = document.createElement("h2");
    const population = document.createElement("p");
    if(type==="planet"){
        population.innerHTML=`Population: ${obj.population}`
    }
    nameEle.innerHTML=obj.name;
    block.append(nameEle, population);
    document.getElementById("wrapper").appendChild(block)
}

const pageInit = ()=>{
    let current = 1;
    check(current, 8)
    printRequest(fetchPlanets(current), "planet")

    const prevEle = document.getElementById("previous")
    const nextEle = document.getElementById("next")

    prevEle.addEventListener("click", ()=>{
        current--;
        printRequest(fetchPlanets(current), "planet")
        check(current, 7)
    })

    nextEle.addEventListener("click", ()=>{
        current++;
        printRequest(fetchPlanets(current), "planet")
        check(current, 7)
    })

}

const check=(curr,max)=>{
    const prevEle = document.getElementById("previous")
    const nextEle = document.getElementById("next")

    prevEle.style.display="block";
    nextEle.style.display="block";

    if(curr<=1){
        prevEle.style.display="none";
    }

    if(curr>=max){
        nextEle.style.display="none";
    }
}

pageInit()

