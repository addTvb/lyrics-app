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
    // Format lyrics
    const capitalize = (string: string): string => {
        return string.trim().replace(/\w\S*/g, (w) =>
            w.replace(/^\w/, (c) => c.toUpperCase())
        );
    };
    const removeFirstRow = (lyric: string): string => {
        return lyric?.replace(
            `Paroles de la chanson ${capitalize(song)} par ${capitalize(
                author
            )}`,
            ""
        );
    };
    // handlers
    const handleSearch = () => {
        refetch();
    };
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === "Enter") {
            refetch();
        }
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
                            onKeyDown={onKeyDown}
                            id="song-input"
                            label="Enter song name"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            value={author}
                            onChange={handleChangeAuthor}
                            onKeyDown={onKeyDown}
                            id="author-input"
                            label="Enter author name"
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <LoadingButton
                        onClick={handleSearch}
                        endIcon={<SearchRoundedIcon />}
                        loading={isFetching}
                        loadingPosition="end"
                        variant="contained"
                        type="submit"
                    >
                        Search
                    </LoadingButton>
                </div>
                {/* Lyrics Content */}
                <div className={styles.home__lyrics_wrapper}>
                    <Typography variant="h6" component="pre" className={styles.home__lyrics}>
                        {error?.message ===
                        "Request failed with status code 404" ? (
                            <h4>We have not found the lyrics of this song</h4>
                        ) : (
                            removeFirstRow(data?.lyrics)
                        )}
                    </Typography>
                </div>
            </main>

            <footer className={styles.home__footer}>
                Created by {"<"}
                <a
                    href="https://github.com/addTvb"
                    className={styles.home__author_link}
                >
                    {" "}
                    addTvb
                </a>{" "}
                {"/>"}
            </footer>
        </div>
    );
};

export default Home;
