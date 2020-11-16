const PORT = process.env.PORT || 1337;
import app from './app';

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
