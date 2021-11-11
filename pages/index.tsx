import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useQuery } from "react-query";
import axios from "axios";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const [song, setSong] = useState("");
    const [author, setAuthor] = useState("");

    const { isFetching, error, data, refetch }: any = useQuery(
        "lyrics",
        getLyrics,
        {
            refetchOnWindowFocus: false,
            enabled: false,
            retry: false,
        }
    );
    function getLyrics() {
        const data: any = axios
            .get(`https://api.lyrics.ovh/v1/${author}/${song}`)
            .then((res: any) => res.data);

        return data;
    }
    // handlers
    const handleSearch = () => {
        refetch();
    };
    const handleChangeSong = (event: any) => {
        setSong(event.target.value);
    };
    const handleChangeAuthor = (event: any) => {
        setAuthor(event.target.value);
    };
    return (
        <div className={styles.home}>
            <Head>
                <title>Lyrics app</title>
                <meta name="description" content="Lyrics app by addTvb" />
                {/* TODO Change favicon */}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.home__header}>
                <h1>Lyrics App</h1>
            </header>

            <main className={styles.home__main}>
                <div className={styles.home__search}>
                    <div className={styles.home__inputs}>
                        <TextField
                            value={song}
                            onChange={handleChangeSong}
                            id="song-input"
                            label="Enter song name"
                            variant="outlined"
                            placeholder="Example: All Of Me"
                            fullWidth
                        />
                        <TextField
                            value={author}
                            onChange={handleChangeAuthor}
                            id="author-input"
                            label="Enter author name"
                            variant="outlined"
                            placeholder="Example: John Legend"
                            fullWidth
                        />
                    </div>
                    <LoadingButton
                        onClick={handleSearch}
                        endIcon={<SearchRoundedIcon />}
                        loading={isFetching}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Search
                    </LoadingButton>
                </div>
                <div className={styles.home__lyrics}>
                    <Typography variant="h6" component="pre">
                        {error?.message ===
                        "Request failed with status code 404" ? (
                            <h4>We have not found the lyrics of this song</h4>
                        ) : (
                            data?.lyrics
                        )}
                    </Typography>
                </div>
            </main>

            <footer className={styles.home__footer}>
                Created by <a href="https://github.com/addTvb">addTvb</a>
            </footer>
        </div>
    );
};

export default Home;
