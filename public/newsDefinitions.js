class newDefinions {

    doLookup(word) {
        return fetch('/lookup/' + word)
            .then(response => response.json());
    }

    save(postBody) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
        
        return fetch('/save/', fetchOptions);
    }
}


export default newDefinions;