import React from 'react';
import styles from './styles.module.css';

type StepProgressProps = {
	currentStep: number; // 1 = Endereço, 2 = Dados, 3 = Confirmação
	steps: string[];
};

export const StepProgress: React.FC<StepProgressProps> = ({
	currentStep,
	steps,
}) => {
	return (
		<div className={styles.stepContainer}>
			{steps.map((label, index) => {
				const stepNumber = index + 1;
				const isCompleted = stepNumber < currentStep;
				const isActive = stepNumber === currentStep;

				return (
					<div className={styles.stepWrapper} key={label}>
						<div className={styles.circleLineContainer}>
							<div
								className={`${styles.stepCircle} ${
									isCompleted ? styles.completed : isActive ? styles.active : ''
								}`}
							>
								{isCompleted ? '✔' : stepNumber}
							</div>
							{index < steps.length - 1 && <div className={styles.stepLine} />}
						</div>
						<div className={styles.stepLabel}>{label}</div>
					</div>
				);
			})}
		</div>
	);
};
