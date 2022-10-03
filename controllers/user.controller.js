



const logOut = (req, res) => {
    let user = req.session.user
    req.session.destroy()
    res.render('bye', {data: user})
   
      
  }


export default {
    logOut
}