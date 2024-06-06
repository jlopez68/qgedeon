import User from "../models/User.js";
import passport from "passport";

export const renderSignUpForm = (req, res) =>   {  const ini = true;
res.render("auth/signup", {ini})};

export const signup = async (req, res) => {


  const { name, apellido, email, tipo_usuario, celular, ciudad, termsAndConditions} = req.body;

  if (termsAndConditions != "on") {
    req.flash("error_msg", "Debe Leer y aceptar los términos y condiciones .");
    return res.redirect("/auth/signup");


  }

  const userFound = await User.findOne({ email: req.body.email });
  if (userFound) {
    req.flash("error_msg", "El Email ya existe.");
    return res.redirect("/auth/signup");
  }

  let errors = [];

//  const { name, apellido, email, tipo_usuario} = req.body;
  const newUser = new User({ name, apellido, email,  tipo_usuario, celular, ciudad}); 
  newUser.tipo_usuario = "Jugador";
  newUser.password = "1234";
  newUser.puntos=0;
  newUser.posicion = 0;
  await newUser.save();
  
  req.flash("success_msg", "Registro Completado");
  //envio del email a administrador para aprobar


  res.redirect("/auth/signin");
};

export const renderSigninForm = (req, res) => { 
  const ini = true;
  res.render("auth/signin", {ini})};

export const renderSigningrupos = (req, res) =>   { 
  const ini = true;
res.render("auth/grupos", {ini})};
export const renderSigninsedes = (req, res) =>   { 
  const ini = true;
res.render("auth/sedes", {ini})};


export const signin = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Cerrando Sesion");

      res.redirect("/");
  });
};



  