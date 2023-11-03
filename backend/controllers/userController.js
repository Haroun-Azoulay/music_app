const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        const { email, password, user, pseudo } = req.body;

        if (!email || !password || !user || !pseudo) {
            return res.status(400).json({ message: "L'email, le mot de passe et le nom d'utilisateur sont requis." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            user,
            pseudo,
        });

        return res.status(201).json({
            message: "Utilisateur créé avec succès!",
            user: newUser,
        });XMLDocument
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Impossible de créer un utilisateur.",
        });
    }
};

const signin = async (req, res, next) => {
    try {
        const { user, password } = req.body;

        if (!user || !password) {
            return res.status(400).json({ message: "Le nom d'utilisateur et le mot de passe sont requis pour la connexion." });
        }

        const foundUser = await UserModel.findOne({
            where: { user: user }
        });

        if (!foundUser) {
            return res.status(401).json({ message: "Identifiants incorrects. Vérifiez votre nom d'utilisateur et votre mot de passe." });
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Identifiants incorrects. Vérifiez votre nom d'utilisateur et votre mot de passe." });
        }

        const token = jwt.sign({ userId: foundUser.id }, "RANDOM_SECRET_KEY", { expiresIn: "24h" });

        return res.status(200).json({
            message: "Connexion réussie!",
            user: foundUser,
            token: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Impossible de se connecter.",
        });
    }
};

const logout= async => (req, res) => {
    res.status(200).json({ message: "Déconnexion réussie" });
};


module.exports = {
    signup,
    signin,
    logout,
  };
