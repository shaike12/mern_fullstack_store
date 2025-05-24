import { useProductStore } from "@/store/product"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react"


const ProductCard = ({product}) => {

    const {deleteProduct, updateProduct} = useProductStore()
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const handleDelete = async (id) => {
        const {success, message} = await deleteProduct(id)
        if (!success) {
            toast({
                title: 'Error delete product.',
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
                toast({
                title: 'Product deleted.',
                description: message,
                status: 'success',
                duration: 9000,
                isClosable: true,
                })
       }
    } 
    const handleUpdate = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct)
        if (!success) {
            toast({
                title: 'Error Update product.',
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
                toast({
                title: 'Product Updated.',
                description: message,
                status: 'success',
                duration: 9000,
                isClosable: true,
                })
       }
       onClose()
    }

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

  return (
    <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} _hover={{ transform: "translateY(-5px)", shadow: "x1" }} transition={"all 0.3s"} bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit={"cover"} />
        <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
                {product.name}
            </Heading>
            <Text frontward={"bold"} fontSize={"x1"} color={textColor} mb={4}>
                {product.price} USD
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
                <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDelete(product._id)} />
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            value={updatedProduct.name}
                            name="Product Name"
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                        <Input
                            type="number"
                            placeholder="Price"
                            value={updatedProduct.price}
                            name="Price"
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} 
                        />
                        <Input
                            placeholder="Image URL"
                            value={updatedProduct.image}
                            name="Image URL"
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} 
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>
                        Update
                    </Button>
                    <Button onClick={onClose} variant='ghost'>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard