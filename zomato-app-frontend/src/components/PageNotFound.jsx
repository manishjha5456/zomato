import { Link } from "react-router-dom";

function PageNotFound(){
    return(<>
    <div className="m-auto" style={{height:"750px",width:"755px"}}>
        <img className="" src="../images/pageNoteFound.png" alt="page not found image" />
        <p className="text-center h2">your page is not found click <Link to={"/"}>HERE</Link> to go home-page</p>
    </div>
    
    </>);
}
export default PageNotFound;