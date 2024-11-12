const url = 'https://fetchaccounts-h4c7yaksja-uc.a.run.app/accounts'

let currOffset = 0;

const fetchPeople = async()=>{

    try {
        const resp = await fetch(url+"offset?="+currOffset)
        if(!resp.ok)
            throw new Error("HTTP error!: "+resp.error);
    
        const { accounts, nextOffset } = await resp.json()
        currOffset = nextOffset

        return accounts
            
    } catch (error) {
        throw new Error("Something went wrong while fetching people");
        
    }
}

export { fetchPeople }