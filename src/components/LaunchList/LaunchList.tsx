import type { Launch } from "../../types/spacex"
import { LaunchCard } from "../LaunchCard/LaunchCard"
import styles from './LaunchList.module.css' 


type Props = {
  launches: Launch[]
  onSeeMore: (launch: Launch) => void
}


export function LaunchList({ launches, onSeeMore }: Props) {
    return (
      <>
       <h1 className={styles.title}> SpaceX Launches 2020 </h1>
           <div className={styles.container}>
      {launches.map((launch: Launch) => (
        <LaunchCard key={launch.mission_name} launch={launch} onSeeMore={onSeeMore} />
      ))}
    </div>
    </>
    )
}
