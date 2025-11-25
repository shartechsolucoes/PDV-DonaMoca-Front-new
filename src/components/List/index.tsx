import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography
} from '@mui/material';
import './index.css';

type Column<T> = {
	header: string;
	accessor?: (item: T) =>any;
	render?: (item: T, index: number) => React.ReactNode;
	sortable?: boolean;
};

type DynamicTableProps<T> = {
	title?: string;
	columns: Column<T>[];
	data: T[];
};


function DynamicTable<T>({ title, columns, data }: DynamicTableProps<T>) {
	const [sortColumn, setSortColumn] = useState<number | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

	const handleSort = (colIndex: number) => {
		if (sortColumn === colIndex) {
			setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortColumn(colIndex);
			setSortDirection('asc');
		}
	};

	const sortedData = React.useMemo(() => {
		if (sortColumn === null) return data;
		const accessor = columns[sortColumn].accessor;
		if (!accessor) return data;

		return [...data].sort((a, b) => {
			const aValue = accessor(a);
			const bValue = accessor(b);

			if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	}, [data, sortColumn, sortDirection, columns]);

	return (
		<TableContainer>
			{title && (
				<Typography variant="h6" sx={{ p: 2 }}>
					{title}
				</Typography>
			)}
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((col, i) => (
							<TableCell key={i}>
								{col.sortable && col.accessor ? (
									<TableSortLabel
										active={sortColumn === i}
										direction={sortColumn === i ? sortDirection : 'asc'}
										onClick={() => handleSort(i)}
									>
										{col.header}
									</TableSortLabel>
								) : (
									col.header
								)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{sortedData.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{columns.map((col, colIndex) => (
								<TableCell key={colIndex}>
									{col.render ? col.render(row, rowIndex) : col.accessor?.(row)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default DynamicTable;
