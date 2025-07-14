import { StringsService } from './strings.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    public strings: StringsService
  ) {}

  showAlert(msg: any, title = 'Alert'): Promise<any> {
    return new Promise(async (resolve) => {
    //   const alert = await this.alertController.create({
    //     cssClass: 'my-custom-class',
    //     header: title,
    //     message: msg,
    //     buttons: [
    //       {
    //         text: 'OK',
    //         cssClass: 'secondary',
    //         handler: (blah) => {
    //           resolve(true);
    //         },
    //       },
    //     ],
    //   });

    //   await alert.present();
    });

  }

  async presentSuccessToast(msg: string) {
    console.log(msg);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 3000, // Toast will close after 3 seconds
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  async presentFailureToast(msg: any) {
    console.log(msg);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 3000, // Toast will close after 3 seconds
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  async presentToast(msg: any) {
    // const toast = await this.toastCtrl.create({
    //   message: msg,
    //   duration: 5000,
    //   position: 'bottom',
    // });
    // toast.present();
  }

  async presentConfirm(
    okText = 'OK',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = '',
    okClass = '',
    cancelClass = ''
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const result = await Swal.fire({
        title: title,
        html: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: okText,
        cancelButtonText: cancelText,
        customClass: {
          confirmButton: okClass,
          cancelButton: cancelClass,
        },
      });

      if (result.isConfirmed) {
        resolve(true); // User clicked OK
      } else {
        resolve(false); // User clicked Cancel or closed the modal
      }
    });
  }

  presentRadioSelections(
    title: any,
    message: any,
    inputs: any,
    okText = 'OK',
    cancelText = 'Cancel'
  ): Promise<any> {
    return new Promise(async (resolve) => {
      // const alert = await this.alertController.create({
      //   header: title,
      //   message,
      //   inputs,
      //   buttons: [
      //     {
      //       text: cancelText,
      //       role: 'cancel',
      //       handler: () => {
      //         resolve(false);
      //       },
      //     },
      //     {
      //       text: okText,
      //       handler: (data) => {
      //         resolve(data);
      //       },
      //     },
      //   ],
      // });
      // alert.present();
    });
  }

  async presentProductModal(product: any, cartService: any) {
    let quantity = 1;
    let specialInstructions = '';
    let selectedVariations: any = [];
    // Prepare variations UI if present
    let variationsHtml = '';
    if (product.variations && product.variations.length > 0) {
      product.variations.forEach((variation: any, vIdx: number) => {
        const isRequired = variation.required ? `<span style='color:#43b02a;font-weight:700;font-size:1rem;margin-left:8px;'>(required)</span>` : `<span style='color:#888;font-size:1rem;margin-left:8px;'>(optional)</span>`;
        variationsHtml += `<div style='margin-bottom:1.2rem;'>
          <div style='font-weight:700;font-size:1.08rem;margin-bottom:0.3rem;'>${variation.name || variation.type || 'Variation'} ${isRequired}</div>
          <div style='display:flex;flex-direction:column;gap:0.5rem;'>`;
        if (variation.options && variation.options.length > 0) {
          variation.options.forEach((option: any, oIdx: number) => {
            const inputType = variation.type === 'single' ? 'radio' : 'checkbox';
            const inputName = `variation_${vIdx}`;
            variationsHtml += `
              <label style='display:flex;align-items:center;font-size:1rem;font-weight:500;gap:0.5rem;'>
                <input type='${inputType}' name='${inputName}' value='${oIdx}' style='margin-right:8px;'>
                <span>${option.name}${option.price ? ` <span style='color:#888;font-size:0.98rem;'>+${product.currency_symbol || '$'}${option.price}</span>` : ''}</span>
              </label>
            `;
          });
        }
        variationsHtml += `</div></div><hr style='margin:1rem 0 0.7rem 0;border:0;border-top:1px dashed #ddd;'>`;
      });
    }
    // Modal HTML
    const html = `
      <div class='swal-product-modal' style='text-align:left;max-width:480px;margin:auto;font-family:inherit;'>
        <div style='width:100%;margin-bottom:1rem;'>
          <img src='${product.image}' alt='' style='width:100%;border-radius:0;object-fit:cover;max-height:240px;'>
        </div>
        <div style='font-size:1.35rem;font-weight:800;margin-bottom:0.5rem;color:#2A435D;'>${product.name}</div>
        <div style='margin-bottom:0.7rem;color:#222;font-size:1.05rem;'>${product.description || ''}</div>
        <hr style='margin:0.7rem 0;border:0;border-top:1px dashed #ddd;'>
        ${variationsHtml}
        <div style='font-weight:600;margin-bottom:0.3rem;'>Special Instructions <span style='color:#888;font-weight:400;'>(optional)</span></div>
        <textarea id='swal-special-instructions' style='width:100%;min-height:60px;margin-bottom:1.1rem;padding:8px 10px;border-radius:4px;border:1px solid #ccc;font-size:1rem;'></textarea>
        <div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem;'>
          <div style='display:flex;align-items:center;gap:0.5rem;'>
            <button type='button' id='swal-qty-minus' style='width:36px;height:36px;font-size:1.2rem;border-radius:6px;border:1px solid #eee;background:#fafafa;'>-</button>
            <span id='swal-qty-value' style='margin:0 10px;font-size:1.1rem;width:28px;display:inline-block;text-align:center;'>1</span>
            <button type='button' id='swal-qty-plus' style='width:36px;height:36px;font-size:1.2rem;border-radius:6px;border:1px solid #eee;background:#fafafa;'>+</button>
          </div>
          <div style='text-align:right;'>
            <span style='font-size:1.15rem;font-weight:700;color:#2A435D;'>${product.currency_symbol || '$'}${product.price}</span>
            ${product.discount ? `<span style='color:#d12e2e;font-weight:700;margin-left:6px;'>(${product.discount}%)</span>` : ''}
            ${product.old_price ? `<div style='font-size:0.98rem;color:#888;'><s>${product.currency_symbol || '$'}${product.old_price}</s></div>` : ''}
          </div>
        </div>
        <button id='swal-add-to-cart-btn' style='width:100%;background:#f87171;color:#fff;font-weight:700;font-size:1.1rem;padding:12px 0;border:none;border-radius:5px;margin-bottom:0.2rem;'>Add to Cart</button>
      </div>
      <style>
        @media (max-width: 600px) {
          .swal-product-modal { max-width: 99vw !important; padding: 0 !important; }
          .swal-product-modal img { max-height: 180px !important; }
        }
        .swal2-popup.swal2-product-popup { padding: 0 !important; }
      </style>
    `;
    await Swal.fire({
      title: '',
      html,
      showConfirmButton: false,
      showCancelButton: false,
      customClass: { popup: 'swal2-product-popup' },
      didOpen: () => {
        // Quantity controls
        const minusBtn = document.getElementById('swal-qty-minus');
        const plusBtn = document.getElementById('swal-qty-plus');
        const qtyValue = document.getElementById('swal-qty-value');
        let qty = 1;
        if (minusBtn && plusBtn && qtyValue) {
          minusBtn.addEventListener('click', () => {
            if (qty > 1) qty--;
            qtyValue.textContent = qty.toString();
            quantity = qty;
          });
          plusBtn.addEventListener('click', () => {
            qty++;
            qtyValue.textContent = qty.toString();
            quantity = qty;
          });
        }
        // Add to Cart button
        const addToCartBtn = document.getElementById('swal-add-to-cart-btn');
        if (addToCartBtn) {
          addToCartBtn.addEventListener('click', () => {
            // Special instructions
            const instructions = (document.getElementById('swal-special-instructions') as HTMLTextAreaElement)?.value || '';
            specialInstructions = instructions;
            // Variations
            let selectedVars: any[] = [];
            if (product.variations && product.variations.length > 0) {
              product.variations.forEach((variation: any, vIdx: number) => {
                const inputName = `variation_${vIdx}`;
                const inputs = document.getElementsByName(inputName);
                let selectedOptions: any[] = [];
                inputs.forEach((input: any, oIdx: number) => {
                  if (input.checked) {
                    selectedOptions.push(variation.options[oIdx]);
                  }
                });
                selectedVars.push({ ...variation, selectedOptions });
              });
            }
            selectedVariations = selectedVars;
            // Build cart product object
            const cartProduct = {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity,
              variations: selectedVariations,
              specialInstructions
            };
            cartService.addToCart(cartProduct);
            Swal.close();
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Added to cart!',
              showConfirmButton: false,
              timer: 2000
            });
          });
        }
      }
    });
  }
}
