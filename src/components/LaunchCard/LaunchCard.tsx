import { Card, Image, Text, Button } from "@mantine/core";
import { type Launch } from "../../types/spacex";
import styles from "./LaunchCard.module.css";

type Props = {
  launch: Launch;
  onSeeMore: (launch: Launch) => void;
};

export function LaunchCard({ launch, onSeeMore }: Props) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder className={styles.card}>
      <Card.Section>
        <Image
          src={launch.links.mission_patch_small}
          height={145}
          alt={launch.mission_name}
          fit="contain"
        />
      </Card.Section>
      <Text className={styles.title}>{launch.mission_name}</Text>
      <Text className={styles.subtitle}>{launch.rocket.rocket_name}</Text>
      <Button className={styles.button} onClick={() => onSeeMore(launch)}>
        See more
      </Button>
    </Card>
  );
}