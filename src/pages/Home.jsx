import { useAuth } from '../context/AuthContext';

function Home(){
    const { user } = useAuth();

    return(
        <>
            <h1>Bienvenue</h1>
            {/* ajouter un message de bienvenue si l'utilisateur est connecté */}
            {user && <p>Bienvenue {user.login}!</p>}
        </>
    );
}

export default Home;