import React from 'react';
const News=React.lazy(()=>import('app_introduction/Mod'));
class App extends React.Component{
    render(){
    return(
        <div> 
            <p> Hello This is Contact page </p>
            <button> Contact page 1 </button>
            <News />
        </div>
    );
}
}

export default App;