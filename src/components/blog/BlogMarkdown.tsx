"use client";

import NextLink from "next/link";

import {
  Box,
  Code,
  Divider,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogMarkdownProps = {
  content: string;
};

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <Box
      sx={{
        "& p": { marginBottom: 6, lineHeight: 1.9 },
        "& li": { marginBottom: 2 },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Heading as="h1" size="xl" mt={10} mb={4}>
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading as="h2" size="lg" mt={10} mb={4}>
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading as="h3" size="md" mt={8} mb={3}>
              {children}
            </Heading>
          ),
          h4: ({ children }) => (
            <Heading as="h4" size="sm" mt={8} mb={3}>
              {children}
            </Heading>
          ),
          p: ({ children }) => (
            <Text color="gray.700" _dark={{ color: "gray.200" }}>
              {children}
            </Text>
          ),
          a: ({ href, children }) => {
            const url = href ?? "#";
            const isInternal = url.startsWith("/");

            return (
              <Link
                as={isInternal ? NextLink : undefined}
                href={url}
                color="brand.600"
                _dark={{ color: "brand.300" }}
                textDecoration="underline"
                target={isInternal ? undefined : "_blank"}
                rel={isInternal ? undefined : "noreferrer"}
              >
                {children}
              </Link>
            );
          },
          ul: ({ children }) => (
            <UnorderedList spacing={2} mb={6} ps={6}>
              {children}
            </UnorderedList>
          ),
          ol: ({ children }) => (
            <OrderedList spacing={2} mb={6} ps={6}>
              {children}
            </OrderedList>
          ),
          li: ({ children }) => <ListItem>{children}</ListItem>,
          blockquote: ({ children }) => (
            <Box
              as="blockquote"
              borderLeftWidth="4px"
              borderColor="brand.500"
              bg="brand.50"
              _dark={{ bg: "whiteAlpha.100" }}
              px={5}
              py={4}
              borderRadius="xl"
              mb={6}
            >
              {children}
            </Box>
          ),
          hr: () => <Divider my={8} />,
          code: ({ children }) => <Code>{children}</Code>,
          pre: ({ children }) => (
            <Box
              as="pre"
              whiteSpace="pre-wrap"
              p={4}
              borderRadius="xl"
              bg="gray.50"
              color="gray.800"
              borderWidth="1px"
              borderColor="gray.200"
              _dark={{ bg: "gray.900", color: "gray.100", borderColor: "gray.700" }}
              overflowX="auto"
              mb={6}
            >
              {children}
            </Box>
          ),
          table: ({ children }) => (
            <TableContainer mb={6}>
              <Table variant="simple">{children}</Table>
            </TableContainer>
          ),
          thead: ({ children }) => <Thead>{children}</Thead>,
          tbody: ({ children }) => <Tbody>{children}</Tbody>,
          tr: ({ children }) => <Tr>{children}</Tr>,
          th: ({ children }) => <Th>{children}</Th>,
          td: ({ children }) => <Td>{children}</Td>,
          img: ({ src, alt }) => (
            <Box
              as="img"
              src={src ?? ""}
              alt={alt ?? ""}
              borderRadius="2xl"
              width="100%"
              height="auto"
              mb={6}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
