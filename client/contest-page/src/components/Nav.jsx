import React from "react";
function Nav(){
    const style={
        marginBottom: "3%" ,
        marginRight: "4%"
    };
    const style2={
        fontWeight: 400 ,
        float: "left" ,
         marginBottom: "3%" ,
         marginLeft: "4%"
    };
    return(
    <div>
        <nav className="navbar  my-nav">
            <button className="my-2 my-sm-0 log_button"  type="submit">Log Out</button>     
        </nav>
        <hr className="my-hr"></hr>
        <nav className="navbar  my-nav2" style={{marginBottom: 0}}>
        <span className="nav-head" style={style2}>
              Your Dashboard
           </span> 
           <div className="navbar my-nav2-right" style={style}>
           <img src="imgs/user.png"  alt="" className="d-inline-block img-nav" loading="lazy" /><span className="nav-head" >Username</span>
           </div>
        </nav>
    </div>
    )
}
export default Nav;