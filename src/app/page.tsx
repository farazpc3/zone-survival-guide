import Image from "next/image";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  return (
    <div className="flex-col mx-32 my-5">
      <BackgroundMusic src="main-theme.mp3" />
      <section>
        <article>
          <h1>Zone Survival Next – Your Ultimate S.T.A.L.K.E.R. Companion</h1>
          <p>
            <strong>Zone Survival Next</strong> is an all-in-one companion app
            designed for fans of the
            <em>S.T.A.L.K.E.R.</em> universe. Whether you’re a newcomer
            exploring the Chernobyl Exclusion Zone or a veteran stalker planning
            your next expedition, the app offers the tools and knowledge you
            need to survive and thrive.
          </p>
          <p>
            At its core, Zone Survival Next functions as a detailed{" "}
            <strong>encyclopedia</strong> of the Zone. You’ll find comprehensive
            information on anomalies, mutants, weapons, artifacts, and
            factions—all presented in a clear and accessible format. It’s your
            portable guide to everything that lurks within the radioactive
            wastelands.
          </p>
          <p>
            The app also features an <strong>interactive map</strong>, allowing
            you to explore key locations, track safe routes, and uncover hidden
            secrets. Combined with the <strong>inventory simulator</strong>, you
            can practice loadouts, manage resources, and test survival
            strategies before stepping foot in the Zone itself.
          </p>
          <p>
            Zone Survival Next isn’t just a reference tool—it’s a survival
            planner, an exploration guide, and a companion for every stalker who
            wants to be prepared for the dangers and mysteries of the Zone.
          </p>
        </article>
      </section>
    </div>
  );
}
