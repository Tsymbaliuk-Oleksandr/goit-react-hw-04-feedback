import { useState } from "react";

import { Box } from "./Box";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Notification } from "./Notification/Notification";
import { Section } from "./Section/Section";
import { Statistics } from "./Statistics/Statistics";

export const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const stateKeys = Object.keys({ good, neutral, bad });
  
  const handleChosenFeedback = ({ option }) => {
    switch (option) {
      case 'good':
        setGood(state => state + 1);
        break;

      case 'neutral':
        setNeutral(state => state + 1);
        break;

      case 'bad':
        setBad(state => state + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => good + neutral + bad;
  const totalFeedback = countTotalFeedback(); 

  const countPositivePercentage = () =>
  totalFeedback && Math.round((good / totalFeedback) * 100);
  const positivePercentage = countPositivePercentage();

    return (
      <Box display="flex" flexDirection="column" alignItems="center" p={5}>
        <Box
          textAlign="center"
          border="normal"
          borderColor="accent"
          borderRadius="normal"
          p={4}
        >
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={stateKeys}
              onLeaveFeedback={handleChosenFeedback}
            ></FeedbackOptions>
          </Section>
        </Box>
        <Box textAlign="left">
          <Section title="Statistics">
            {totalFeedback === 0 ? (
              <Notification message="There is no feedback"></Notification>
            ) : (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={totalFeedback}
                positivePercentage={positivePercentage}
              />
            )}
          </Section>
        </Box>
      </Box>
    );
  }

