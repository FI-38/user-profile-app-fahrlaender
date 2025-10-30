// FakeToggleLoginButton-Komponente für den Login-Status
import { Button } from "react-bootstrap";

function FakeToggleLoginButton({ isLoggedIn, onToggle }) {
    return (
        <Button onClick={onToggle} style={{ position: 'fixed', right: 15, top: 130 }}>
        {isLoggedIn ? 'Ausloggen' : 'Einloggen'}
        </Button>
    );
}

const handleToggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
        if (!isLoggedIn) {
            setMessage('Sie wurden erfolgreich ausgeloggt.');
        } else {
            setMessage('');
        }
    };
export default FakeToggleLoginButton;