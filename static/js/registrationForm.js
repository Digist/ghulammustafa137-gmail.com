(function handleForm(window){
    const registrationForm = document.getElementById('registration-form');
    registrationForm.onsubmit = function(e){
        e.stopImmediatePropagation();
        e.preventDefault();
        const {email:{value:em},phoneNumber:{value:pN},firstName:{value:fN},cnic:{value:cc},year:{value:y},domain:{value:dn},discipline:{value:dis},about:{value:ab},association:{value:as},why:{value:wy},achievements:{value:ach},image:{files}} = registrationForm;
        if(em && pN && fN && cc && y && dn && dis && ab && as && wy && ach && files[0]){
            if(!(/\d{4}-\d{7}/.test(pN))) return showMsg('Phone NUmber in wrong format','danger');
            if(!(/\d{5}-\d{7}-\d/).test(cc)) return showMsg('CNIC Number in wrong format','danger');
            if(files[0].size > 500*1024*1024) return showMsg('Image greater than 500kb','danger');
            fetch('http://127.0.0.1:5000/registration',{
                method:'POST',
                body: new FormData(registrationForm)
            })
                .then(response => {
                    if(!response.ok) throw new Error('Server encountered an error');
                    return response.json();
                })
                .then(data => {
                    if(data.err) throw new Error(data.err);
                    showMsg(`Your application has been received.Your application id is pes/20/${data.id}.You can use this id to check the status of your application.`,'success')
                    registrationForm.reset();
                })
                .catch(err => showMsg(err.message,'danger'))
        }else{
            showMsg('Incomplete form submitted','danger');
        }
    }
}(window));