document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('add-product-button').addEventListener('click', () => {
      window.location.href = './addproduct.html'; // Replace with the actual URL for adding a product
    });
  
    document.getElementById('delete-product-button').addEventListener('click', () => {
      window.location.href = './deleteproduct.html'; // Replace with the actual URL for deleting a product
    });
  
    document.getElementById('edit-product-button').addEventListener('click', () => {
      window.location.href = './productmodification.html'; // Replace with the actual URL for editing a product
    });
  
    document.getElementById('view-products-button').addEventListener('click', () => {
      window.location.href = './productlist.html'; // Replace with the actual URL for viewing products
    });
  });
  