import { useProductStore } from "../store/product"
import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useToast } from '@chakra-ui/react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })
  const {createProduct} = useProductStore()
  const toast = useToast()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    if (!success) {
      toast({
        title: 'Error creating product.',
        description: message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      
    }else {
        toast({
          title: 'Product created.',
          description: message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setNewProduct({
          name: "",
          price: "",
          image: "",
        })
    }
}
    
    
  
  
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
            />
            <Input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
            />
            <Button colorScheme="blue" w={"full"} onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>

    </Container>
  )
}

export default CreatePage