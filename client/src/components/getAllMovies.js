import FactoryContract from './../contracts/FactoryContract.json'
import MovieContract from './../contracts/MovieContract.json'

async function getAllMovies (web3) {
    let data = []

    try{
        const networkId = await web3.eth.net.getId()
        const deployedNetwork = FactoryContract.networks[networkId];
        const FactoryInstance = new web3.eth.Contract(
            FactoryContract.abi,
            deployedNetwork.address
            // '0xbCf0166D8a3b374FFFbd4F9C16d6B73397CdEf06'
        );
        const count = await FactoryInstance.methods.contractCount().call()
        let add, instance, name, summary;
        for(let i = 1; i <= count.toNumber(); i++) {
            add = await FactoryInstance.methods.findById(i).call()
            instance = new web3.eth.Contract(MovieContract.abi, add)
            name = await instance.methods.movieName().call()
            summary = await instance.methods.summary().call()
            data.push({
                address: add, 
                instance: instance, 
                name: name, 
                summary: summary
            })
        }
    }
    catch (err){
        console.log(err)
    }

    return data;    

} 

export default getAllMovies;