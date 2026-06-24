"use client";

import { useMemo, useState } from "react";

import {
  Box,
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const weekDayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateKey(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function buildMonthGrid(month: Date) {
  const monthStart = startOfMonth(month);
  const gridStart = new Date(monthStart);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const days: Date[] = [];
  for (let index = 0; index < 42; index += 1) {
    const next = new Date(gridStart);
    next.setDate(gridStart.getDate() + index);
    days.push(next);
  }

  return { monthStart, days };
}

type DatePickerProps = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

export function DatePicker({ name, defaultValue, placeholder = "Select date" }: DatePickerProps) {
  const initial = defaultValue ? parseDateKey(defaultValue) : null;
  const [selected, setSelected] = useState<Date | null>(initial);
  const [month, setMonth] = useState<Date>(() => startOfMonth(initial ?? new Date()));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const value = selected ? toDateKey(selected) : "";

  const label = useMemo(() => {
    if (!selected) {
      return placeholder;
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(selected);
  }, [placeholder, selected]);

  const { monthStart, days } = useMemo(() => buildMonthGrid(month), [month]);
  const monthLabel = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(monthStart), [monthStart]);
  const todayKey = useMemo(() => toDateKey(new Date()), []);

  return (
    <Box>
      <input type="hidden" name={name} value={value} />
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-start">
        <PopoverTrigger>
          <Button
            variant="outline"
            justifyContent="flex-start"
            width="100%"
            leftIcon={<Calendar size={16} />}
            color={selected ? "inherit" : "gray.500"}
            _dark={{ color: selected ? "inherit" : "gray.400" }}
          >
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent width="320px" borderRadius="2xl" overflow="hidden" _focus={{ boxShadow: "none" }}>
          <PopoverBody p={4}>
            <Stack spacing={3}>
              <HStack justify="space-between">
                <IconButton
                  aria-label="Previous month"
                  size="sm"
                  variant="ghost"
                  icon={<ChevronLeft size={18} />}
                  onClick={() => setMonth((current) => startOfMonth(addMonths(current, -1)))}
                />
                <Text fontWeight="semibold">{monthLabel}</Text>
                <IconButton
                  aria-label="Next month"
                  size="sm"
                  variant="ghost"
                  icon={<ChevronRight size={18} />}
                  onClick={() => setMonth((current) => startOfMonth(addMonths(current, 1)))}
                />
              </HStack>

              <SimpleGrid columns={7} spacing={1}>
                {weekDayLabels.map((dayLabel) => (
                  <Box key={dayLabel} textAlign="center" fontSize="xs" fontWeight="semibold" color="gray.500" _dark={{ color: "gray.400" }}>
                    {dayLabel}
                  </Box>
                ))}

                {days.map((day) => {
                  const key = toDateKey(day);
                  const isOutside = day.getMonth() !== monthStart.getMonth();
                  const isSelected = selected ? toDateKey(selected) === key : false;
                  const isToday = key === todayKey;

                  return (
                    <Button
                      key={key}
                      size="sm"
                      variant={isSelected ? "solid" : "ghost"}
                      colorScheme={isSelected ? "brand" : undefined}
                      fontWeight={isSelected ? "semibold" : "medium"}
                      opacity={isOutside ? 0.45 : 1}
                      height="34px"
                      borderRadius="lg"
                      position="relative"
                      onClick={() => {
                        setSelected(day);
                        onClose();
                      }}
                    >
                      {day.getDate()}
                      {isToday && !isSelected ? (
                        <Box
                          position="absolute"
                          bottom="6px"
                          left="50%"
                          transform="translateX(-50%)"
                          width="6px"
                          height="6px"
                          borderRadius="full"
                          bg="brand.400"
                        />
                      ) : null}
                    </Button>
                  );
                })}
              </SimpleGrid>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

