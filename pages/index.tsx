import type { NextPage } from "next";

import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

import Head from "next/head";
import Image from "next/image";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Home: NextPage = () => {
    return (
        <div className="home">
            <Head>
                <title>Lyrics app</title>
                <meta name="description" content="Lyrics app by addTvb" />
                {/* TODO Change favicon */}
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="home__main">
                <div className="home__search">
                    <div className="home__inputs">
                        <TextField
                            id="song-input"
                            label="Enter song name"
                            variant="outlined"
                            placeholder="Example: All Of Me"
                        />
                        <TextField
                            id="author-input"
                            label="Enter author name"
                            variant="outlined"
                            placeholder="Example: John Legend"
                        />
                    </div>
                    <LoadingButton
                        // onClick={handleClick}
                        // endIcon={<SendIcon />}
                        // loading={loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Search
                    </LoadingButton>
                </div>
            </main>

            <footer className="home__footer"></footer>
        </div>
    );
};

export default Home;
