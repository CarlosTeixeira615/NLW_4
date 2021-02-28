import styled from "../styles/pages/Home.module.css";
import { ChallengesProvider } from "../context/ChallengesContext";

import EsperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import CompletedChallenges from "../components/CompletedChallenges";
import CounterDown from "../components/CounterDown";
import ChallendBox from "../components/ChallendBox";

import Head from "next/head";
import { CountdownProvider } from "../context/CountDownContext";
import { GetServerSideProps } from "next";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styled.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <div>
          <EsperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <CounterDown />
              </div>
              <ChallendBox />
            </section>
          </CountdownProvider>
        </div>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
