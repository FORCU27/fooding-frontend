'use client';

import { useState } from 'react';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TablePagination,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Stack,
  Pagination,
} from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, row: any) => React.ReactNode;
}

interface DataGridProps {
  columns: Column[];
  rows: any[];
  loading?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  actions?: React.ReactNode;
  onRowClick?: (row: any) => void;
  dense?: boolean;
  striped?: boolean;
  sx?: any;
  pagination?: {
    page: number;
    rowsPerPage: number;
    totalCount: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newRowsPerPage: number) => void;
  };
}

export default function DataGrid({
  columns,
  rows,
  loading = false,
  selectable = false,
  onSelectionChange,
  actions,
  onRowClick,
  dense = true,
  striped = true,
  sx = {},
  pagination,
}: DataGridProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
    } else {
      setSelected([]);
      onSelectionChange?.([]);
    }
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleChangePage = (event: unknown, newPage: number) => {
    if (!isMoblie) return pagination?.onPageChange(newPage);
    if (isMoblie) return pagination?.onPageChange(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    pagination?.onRowsPerPageChange(+event.target.value);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {actions && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>{actions}</Box>
      )}
      <TableContainer>
        <Table stickyHeader size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding='checkbox'>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: 'background.paper',
                    fontWeight: 'bold',
                    whiteSpace: isMoblie ? 'wrap' : 'nowrap',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)} align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)} align='center'>
                  데이터가 없습니다
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    onClick={() => onRowClick?.(row)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: onRowClick ? 'pointer' : 'default',
                      ...(striped && {
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'action.hover',
                        },
                      }),
                    }}
                  >
                    {selectable && (
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClick(row.id);
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            whiteSpace: isMoblie ? 'wrap' : 'nowrap',
                            ...(dense && {
                              padding: isMoblie ? '8px' : '6px 16px',
                            }),
                          }}
                        >
                          {column.format ? column.format(value, row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination &&
        (isMoblie ? (
          <Stack spacing={2}>
            <Pagination
              count={Math.max(0, Math.ceil(pagination.totalCount / pagination.rowsPerPage))} // 전체 페이지 수 계산
              page={pagination.page + 1} // 페이지를 1부터 시작하도록 보정
              onChange={handleChangePage}
              showFirstButton
              showLastButton
              sx={{
                minHeight: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </Stack>
        ) : (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 300, 400, 500, 600]}
            component='div'
            count={pagination.totalCount}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} / 전체 ${count}건`}
            labelRowsPerPage='페이지당 행 수'
          />
        ))}
    </Paper>
  );
}
