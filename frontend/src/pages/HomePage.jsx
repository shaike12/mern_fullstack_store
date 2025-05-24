import ProductCard from "@/components/ProductCard"
import { useProductStore } from "@/store/product"
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  const {fetchProducts, products} = useProductStore()

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts()
    } 
    fetchData()
  }
  , [])
  console.log(products)

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"} bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip={"text"}>
          Welcome to the Products Store 🛒
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (<ProductCard key={product._id} product={product} />))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
          No Products Found
          <Link to={"/create"}>
            <Text as={"span"} color={"blue.500"} __hover={{ textDecoration: "underline" }}>
              {" "}Click here to create a new product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>


    </Container>

  )
}

export default HomePage