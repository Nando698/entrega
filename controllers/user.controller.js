



const logOut = (req, res) => {
    let user = req.session.user
    req.session.destroy()
    res.render('bye', {data: user})
   
      
  }

  const adminPanel = (req, res) => {

    res.render('panel')
   
      
  }


export default {
    logOut,
    adminPanel
}