// lib/server/donation.ts
"use server"
import { prisma } from "@/lib/prisma";
import { CreateInvoice, MakePushUSSD } from "@/lib/ebilling/pay";

interface DonationData {
  amount: number;
  payer_msisdn: string;
  payer_email: string;
  short_description: string;
  external_reference: string;
  courseId: string;  // Même si on ne l'utilise pas ici, on garde ce champ pour la structure de données
}

export async function createDonation(data: DonationData) {
  try {
    // Créer une facture via l'API externe
    const getInvoice = await CreateInvoice(data);
    if (!getInvoice.server_transaction_id) {
      return { success: false, message: "Impossible de traiter la transaction." };
    }

    // Créer la commande dans la base de données (sans l'information du produit)
    const commande = await prisma.donation.create({
      data: {
        reference: data.external_reference,
        payerEmail: data.payer_email,
        payerMsisdn: data.payer_msisdn,
        shortDescription: data.short_description,
        amount: data.amount,
        server_transaction_id: getInvoice.server_transaction_id,
        bill_id: getInvoice.e_bill.bill_id,
      }
    });

    // Initier le paiement via USSD
    const paymentSystemName = "airtelmoney"; // Exemple de système de paiement
    await MakePushUSSD({
      bill_id: getInvoice.e_bill.bill_id,
      payment_system_name: paymentSystemName,
      payer_msisdn: data.payer_msisdn,
    });

    return { success: true, message: "Don effectué avec succès !" };
  } catch (error) {
    console.error("Erreur lors du don:", error);
    return { success: false, message: "Une erreur s'est produite lors du traitement du don." };
  }
}
