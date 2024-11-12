const url = 'https://fetchaccounts-h4c7yaksja-uc.a.run.app/accounts'

let currOffset = 0;

const fetchPeople = async(currOffset)=>{

    try {
        const resp = await fetch(url+"offset?="+currOffset)
        if(!resp.ok)
            throw new Error("HTTP error!: "+resp.error);
    
        const { people, offset } = await resp.json()
        currOffset = offset
    
        return people
            
        
    } catch (error) {
        throw new Error("Something went wrong while fetching people");
        
    }
}