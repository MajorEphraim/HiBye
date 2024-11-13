const url = "https://api-h4c7yaksja-uc.a.run.app/accounts"

const uploadAccountDetails = async(username, email, userId)=>{

    try {
        
        const resp = await fetch(url+"/"+userId,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
            }),
        })
    
        if (!resp.ok) {
            throw new Error(`Failed to set account details: ${resp.statusText}`);
        }
    } catch (error) {
        throw new Error(`Failed to set account details: ${error}`);

    }
}

const updateAccountDetails =async(userId,details)=>{

    try {
        
        const resp = await fetch(url+"/"+userId,{
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(details)
        })
    
        if (!resp.ok) {
            throw new Error(`Failed to update account details: ${resp.statusText}`);
        }
    } catch (error) {
        throw new Error(`Failed to update account details: ${error.message}`);

    }
}

const fetchAccountDetails = async(userId)=>{
    
    try {
        const resp = await fetch(url+"/"+userId,{method:'GET'})

        if (!resp.ok) {
            throw new Error(`Failed to fetch account details: ${resp.statusText}`);
        }

        const data = await resp.json()
        return data
        
    } catch (error) {
        throw new Error(`Failed to fetch account details: ${error}`);
    }

}

const deleteAccount = async(userId) =>{

    try {
        const resp = await fetch(url+"/"+userId,{method:'DELETE'})

        if (!resp.ok) {
            throw new Error(`Failed to delete account details: ${resp.error}`);
        }
        
    } catch (error) {
        throw new Error(`Failed to delete account details: ${error}`);
    }

}

export { uploadAccountDetails, updateAccountDetails, fetchAccountDetails, deleteAccount }