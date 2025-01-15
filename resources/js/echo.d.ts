import Echo from 'laravel-echo';

declare global {
    interface Window {
        Pusher: any;
        Echo: Echo;
    }
}

const echo: Echo;
export default echo;
